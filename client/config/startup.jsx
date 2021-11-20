import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux";
import { checkSignIn } from "../redux/reducers/auth";
import { wsSubscribe } from "../redux/sockets";

const Startup = (props) => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)

  useEffect(() => {
    if (token) {
      dispatch(checkSignIn())
      dispatch(wsSubscribe())
    }
  }, [token])

  return props.children
}

Startup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
}

export default Startup
