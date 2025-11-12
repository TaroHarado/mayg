// Phantom Wallet Connection
let walletConnected = false;
let publicKey = null;

// Проверка наличия Phantom кошелька
function isPhantomInstalled() {
    return typeof window.solana !== 'undefined' && window.solana.isPhantom;
}

// Подключение к Phantom кошельку
async function connectWallet() {
    try {
        if (!isPhantomInstalled()) {
            alert('Phantom кошелек не установлен. Пожалуйста, установите Phantom кошелек: https://phantom.app/');
            return false;
        }

        // Подключение к кошельку (это вызовет первое окно Phantom)
        const response = await window.solana.connect();
        publicKey = response.publicKey.toString();
        walletConnected = true;

        // Обновление UI после подключения
        updateWalletButton();
        
        // Запрос подписи для аутентификации (это вызовет второе окно Phantom для подписи)
        try {
            await requestSignature();
            
            // Сохранение в localStorage только после успешной подписи
            localStorage.setItem('walletConnected', 'true');
            localStorage.setItem('publicKey', publicKey);
        } catch (sigErr) {
            // Если подпись не удалась, но подключение было успешным,
            // отключаем кошелек
            if (sigErr.code !== 4001) {
                await disconnectWallet();
            }
            throw sigErr;
        }

        return true;
    } catch (err) {
        console.error('Ошибка подключения:', err);
        if (err.code === 4001) {
            // Пользователь отклонил - не показываем ошибку
            walletConnected = false;
            publicKey = null;
            updateWalletButton();
        } else {
            alert('Ошибка подключения к кошельку: ' + err.message);
        }
        return false;
    }
}

// Запрос подписи для аутентификации
async function requestSignature() {
    try {
        if (!publicKey || !window.solana) {
            throw new Error('Кошелек не подключен');
        }

        // Создаем сообщение для подписи
        const messageText = `Подключение к mayhem.tax\n\nАдрес: ${publicKey}\nВремя: ${new Date().toISOString()}`;
        const encodedMessage = new TextEncoder().encode(messageText);

        // Запрашиваем подпись (это вызовет окно Phantom)
        // Пробуем разные форматы API для совместимости
        let signedMessage;
        try {
            // Новый формат API (объект)
            if (typeof window.solana.signMessage === 'function') {
                signedMessage = await window.solana.signMessage(encodedMessage, 'utf8');
            } else {
                throw new Error('Метод signMessage не доступен');
            }
        } catch (apiErr) {
            // Если не сработало, пробуем альтернативный формат
            console.warn('Попытка альтернативного формата API:', apiErr);
            throw apiErr;
        }
        
        console.log('Подпись получена:', signedMessage);
        return signedMessage;
    } catch (err) {
        console.error('Ошибка запроса подписи:', err);
        if (err.code === 4001) {
            alert('Подпись отклонена пользователем');
            // Если подпись отклонена, отключаем кошелек
            await disconnectWallet();
        } else {
            alert('Ошибка запроса подписи: ' + err.message);
        }
        throw err;
    }
}

// Отключение кошелька
async function disconnectWallet() {
    try {
        if (window.solana && walletConnected) {
            await window.solana.disconnect();
        }
        walletConnected = false;
        publicKey = null;
        localStorage.removeItem('walletConnected');
        localStorage.removeItem('publicKey');
        updateWalletButton();
    } catch (err) {
        console.error('Ошибка отключения:', err);
    }
}

// Обновление кнопки подключения
function updateWalletButton() {
    const connectBtn = document.getElementById('connectWalletBtn');
    const walletInfo = document.getElementById('walletInfo');
    
    if (connectBtn && walletInfo) {
        if (walletConnected && publicKey) {
            connectBtn.style.display = 'none';
            walletInfo.style.display = 'flex';
            // Показываем сокращенный адрес
            const shortAddress = `${publicKey.slice(0, 4)}...${publicKey.slice(-4)}`;
            walletInfo.innerHTML = `
                <span class="text-xs text-zinc-300">${shortAddress}</span>
                <button onclick="disconnectWallet()" class="text-xs text-zinc-400 hover:text-white">Disconnect</button>
            `;
        } else {
            connectBtn.style.display = 'flex';
            walletInfo.style.display = 'none';
        }
    }
}

// Проверка подключения при загрузке страницы
function checkWalletConnection() {
    const saved = localStorage.getItem('walletConnected');
    if (saved === 'true' && window.solana) {
        // Попытка автоматического переподключения
        window.solana.connect({ onlyIfTrusted: true })
            .then(response => {
                publicKey = response.publicKey.toString();
                walletConnected = true;
                updateWalletButton();
            })
            .catch(() => {
                // Если автоматическое подключение не удалось, сбрасываем состояние
                walletConnected = false;
                publicKey = null;
                localStorage.removeItem('walletConnected');
                localStorage.removeItem('publicKey');
                updateWalletButton();
            });
    } else {
        updateWalletButton();
    }
}

// Инициализация при загрузке страницы
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkWalletConnection);
} else {
    checkWalletConnection();
}

// Обработка отключения кошелька пользователем
if (window.solana) {
    window.solana.on('disconnect', () => {
        walletConnected = false;
        publicKey = null;
        localStorage.removeItem('walletConnected');
        localStorage.removeItem('publicKey');
        updateWalletButton();
    });
}

