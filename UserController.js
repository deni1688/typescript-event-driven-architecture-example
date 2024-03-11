export class UserController {
    constructor(app, userService) {
        this.userService = userService;

        app.post('/users', this.createUser.bind(this));
        app.get('/users', this.getUsers.bind(this));
        app.get('/users/:id', this.getUserById.bind(this));
    }

    createUser(req, res) {
        const { name, email } = req.body;

        const message = this.userService.createUser(name, email);

        res.status(202).json({ message });
    }

    getUsers(_req, res) {
        const users = this.userService.getUsers();

        res.status(200).json(users);
    }

    getUserById(req, res) {
        const user = this.userService.getUserById(req.params.id);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json(user);
    }
}
