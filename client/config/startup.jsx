import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import { checkSignIn } from '../redux/reducers/auth'
import { wsSubscribe } from '../redux/sockets'

const Startup = (props) => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)
  const login = useSelector((state) => state.auth.user.login)
  const isSocketReady = useSelector((state) => state.auth.isSocketReady)
  useEffect(() => {
    if (token) {
      dispatch(checkSignIn())
    }
  }, [])

  useEffect(() => {
    // console.log('Update conditions. Now:', !!isSocketReady && !!token && !!login)
    if (!!isSocketReady && !!token && !!login) {
      dispatch(wsSubscribe())
    }
  }, [isSocketReady, token, login])

  return props.children
}

Startup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
}

export default Startup
