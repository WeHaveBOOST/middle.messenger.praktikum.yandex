import { Block } from "../../core/index";
import template from "./EditingSettingsForm.tmp.pug";
import { getValuesFromForm } from "../utils/index";
import { Event } from "../utils/getValuesFromForm";

export default class EditingSettingsForm extends Block {
  constructor(props?: object) {
    const newProps = {
      ...props,
      events: new Map([
        ['submit', (event: Event) => getValuesFromForm(event, this)],
      ]),
    }

    super('div', newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}
