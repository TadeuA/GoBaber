import User from "../models/User"

export default{
    render(user: User){
        return{
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            created_at: user.created_at,
            updated_at: user.updated_at,
        }
    },
    renderMany(users: User[]){
        return users.map(user => this.render(user))
    }
}
