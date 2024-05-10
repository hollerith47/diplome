import {useLocation} from "react-router-dom";

export default function useUserParam(){
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get('user');
}
