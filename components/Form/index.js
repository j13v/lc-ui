import React, { Component } from "react";
import { render } from "react-dom";
import Widgets from "./widgets";
import Fields from "./fields";

import Form from "react-jsonschema-form";

const log = (type) => console.log.bind(console, type);

export default ({schema, widgets, fields, children, ...props}) => (<Form
    schema={schema}
    widgets={{...Widgets, ...widgets}} fields={{...Fields, ...fields}}
    onChange={log("changed")}
    onSubmit={log("submitted")}
    onError={log("errors")} {...props}
>{children}</Form>)
