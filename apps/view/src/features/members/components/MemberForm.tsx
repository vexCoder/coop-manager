import { Form } from "@components/Form";
import { ToggleButtonsField } from "@components/Form/ToggleButtonsField";
import { Tooltip } from "@components/Utils/Tooltip/Tooltip";
import { Member } from "@coop/database";
import { Constants } from "@utils/constants";
import _ from "lodash";
import { useCallback } from "react";

type Values = Member | Omit<Member, "id">;

type Props = {};

export const MemberForm = ({}: Props) => {
  const handleSubmit = useCallback((data: Values) => {
    console.log(data);
  }, []);

  const religionOptions = Constants.RELIGIONS.map((v) => ({
    label: _.chain(v).lowerCase().capitalize().value(),
    value: v,
  }));

  return (
    <Form onSubmit={handleSubmit}>
      <div className="flex flex-col items-start gap-2">
        <div className="flex w-full items-center gap-2">
          <Form.Text name="firstname" label="First Name" />
          <Form.Text
            name="lastname"
            label="Last Name"
            error="Invalid Lastname"
          />
        </div>
        <Form.Select
          options={religionOptions}
          name="religion"
          label="Religion"
        />
        <ToggleButtonsField
          name="gender"
          label="Gender"
          options={[
            { label: "Test", value: "1" },
            { label: "Test 2", value: "2" },
          ]}
        />

        <div className="flex w-full justify-center">
          <Tooltip title="Test">
            <span>Test</span>
          </Tooltip>
        </div>
        <button type="submit">Submit</button>
      </div>
    </Form>
  );
};
