import axios from "axios"

const ServerPage = async () => {
    const {data} = await axios.get('https://jsonplaceholder.typicode.com/todos/1')

    return <div>{JSON.stringify(data)}</div>
}

export default ServerPage