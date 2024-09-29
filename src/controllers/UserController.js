import bcrypt from "bcrypt";
import { prisma } from "../services/prisma";
import { userValidator } from "../validations/userValidator";

class UserController {
	async store(req, res) {
		try {
			await userValidator.validate(req.body);
			const { name, email, password } = req.body;

			const userExist = await prisma.user.findUnique({
				where: {
					email
				}
			})

			if(userExist) {
				return res.status(400).json({
					errors: ["Usuário já existe"]
				});
			} 

			const hashPassword = await bcrypt.hash(password, 10);

			const user = await prisma.user.create({
				data: {
					name,
					email,
					password: hashPassword
				},
				select: {
					name: true,
					email: true
				}
			});

			return res.status(200).json(user);
		} catch (e) {
			res.status(400).json({
				e
			});
		}
	}
}

export default new UserController();
