import UserCard from "../UserCard"

export default function UserList({users}) {
    return (
        <ul className="flex flex-col items-center">
            {users.map(({id, name, avatar, jobTitle, present}) => <UserCard key={id} name={name} avatar={avatar} jobTitle={jobTitle} present={present} />)}
        </ul>
    )
}