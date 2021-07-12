import { useEffect } from "react";
import { connect } from "react-redux";
import { get_user_details } from "../../actions/auth.action";

const Decider = (props) => {
  useEffect(() => {
    console.log("karan called useEffect()");
    const { auth, history } = props;
    if (auth.token === null) {
      history.replace("/login");
    } else if (auth.user === null) {
      props.get_user_details();
    } else if (auth.user !== null) {
      console.log("inside elese", props);
      if (auth.user.role === "normal") {
        console.log("inside if");
        history.replace("/dashboard");
      } else if (auth.user.role === "admin") {
        history.replace("/admin-dashboard");
      }
    }
  }, [props.auth.user]);
  return null;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { get_user_details })(Decider);
