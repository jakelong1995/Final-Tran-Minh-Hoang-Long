import { object } from "joi";
import { pick } from "lodash";
const validation = (schema) => {
  return async (req, res, next) => {
    try {
      const _schema = object(schema);

      const valid = await _schema.validate(pick(req, Object.keys(schema)));

      console.log("------validation", valid, schema);
      const { error } = valid;

      if (error) {
        return res.status(400).json({
          msg: "Validation fail!",
          error: error,
        });
      } else {
        next();
      }
    } catch (e) {
      return res.status(400).json({
        msg: "Validation fail!",
        error: e,
      });
    }
  };
};

export default validation;
