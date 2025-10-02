import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Token requerido' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } 
    catch (error) {
        return res.status(403).json({ message: 'Token inválido o expirado' });
    }
};

export const checkRole = (rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.user) {
        return res.status(401).json({ message: 'No autenticado' });
        }

        if (!rolesPermitidos.includes(req.user.role)) {
        return res.status(403).json({ message: 'No autorizado' });
        }

        next();
    };
};

