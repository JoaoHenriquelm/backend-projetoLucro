import jwt from "jsonwebtoken";
import { prisma } from "../services/prisma";

export default async (req, res, next) => {
	try {
		const { authorization } = req.cookies;
		
		if (!authorization) {
			return res.status(401).json({
				errors: ["Login required"]
			});
		}

		const data = jwt.verify(authorization, process.env.TOKEN_SECRET);

		const { id, email } = data;

		const user = await prisma.user.findUnique({
			where: {
				id,
				email
			}
		});

		if (!user) {
			return res.status(401).json({
				errors: ["Token expirado ou inválido"]
			});
		}

		req.userId = id;
		return next();
	} catch {
		return res.status(401).json({
			errors: ["Token expirado ou inválido"]
		});
	}
};
