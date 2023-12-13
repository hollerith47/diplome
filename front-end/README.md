```react-redux
store:{
app
}
```
```javascript
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";


const compent = () => {
  const {sidebar} = useSelector((store) => store.app);
  const dispatch = useDispatch();
}
```
