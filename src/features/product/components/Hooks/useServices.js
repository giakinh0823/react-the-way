import { useEffect, useState } from "react"
import serviceApi from "../../../../api/serviceApi"



const useServices = () => {
    const [services, setServices] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        ;(async () => {
            try {
                const response = await serviceApi.getAll({});
                setServices(response.data)
            } catch (error) {
                console.log(error)
            }
            setLoading(false);
        })()
    }, [])
    return {services, loading};
}

export default useServices