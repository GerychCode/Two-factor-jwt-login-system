import qr from "qrcode";
export default (req, res, next) => {
    try {
        const secret = req.query.secret;
        const name = req.query.name;

        const googleAuthQR = `otpauth://totp/${name}?secret=${secret}`;

        qr.toDataURL(googleAuthQR, (err, url) => {
            if (err) {
                res.status(500).send('Ошибка генерации QR-кода');
            } else {
                const img = `<img src="${url}" style="display:block; margin:auto;"/>`;
                res.send(img);
            }
        });
    }
    catch (e) {
        console.log(e)
        next(e)
    }
}