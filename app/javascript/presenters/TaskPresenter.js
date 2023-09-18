import PropTypes from "prop-types";
import PropTypesPresenter from "../utils/propTypesPresenter";

export default new PropTypesPresenter(
  {
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
  },
  {}
);
