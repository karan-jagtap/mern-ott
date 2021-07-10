import { connect } from "react-redux";

const Decider = (props) => {
  const { auth, history } = props;
  if (auth.user === undefined) {
    history.replace("/login");
  }
  return null;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(Decider);
