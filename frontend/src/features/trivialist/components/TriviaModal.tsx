import React, { Key, useEffect, useState } from "react";
import {
  Modal,
  Button,
  Text,
  Input,
  Row,
  Checkbox,
  FormElement,
  Textarea,
  Dropdown,
} from "@nextui-org/react";
import {
  CommentOutlined,
  LockOutlined,
  LoginOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { AxiosError } from "axios";
import { useCategory } from "../api/getCategory";
import { TriviaCategory } from "../types";

interface TriviaModalProps {
  visible: boolean;
  onClose: Function;
  type: "Add" | "Edit";
}
type SelectionType = "all" | Set<Key>;
type TriviaFields = {
  question: string;
  answer: string;
  category: number[];
};

export const TriviaModal: React.FC<TriviaModalProps> = ({
  visible,
  onClose,
  type,
}) => {
  const [triviaFields, setTriviaFields] = useState<TriviaFields>({
    answer: "",
    question: "",
    category: [],
  });
  const [selected, setSelected] = React.useState<SelectionType>(
    new Set(["all"])
  );
  const { data: catgories } = useCategory();
  const closeHandler = () => {
    onClose();
  };

  const handleChange = (event: React.ChangeEvent<FormElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setTriviaFields((values) => ({ ...values, [name]: value }));
  };

  const getDropdownDisplayValue = () => {
    let values = Array.from(selected)
    let names:string[] = []
    for (let i = 0; i < values.length; i ++) {
      if (i > 3){
        let remainder = values.length - i
        names.push(`And ${remainder} more`)
        break;
      }
      let category = catgories?.find((x) => x.id == values[i]);
      if (category)
        names.push(category.category_name)
    }
    if (names.length > 0) return names.join(", ");
    else return "Pick a category(s)";
  };

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={visible}
      onClose={closeHandler}
    >
      <form>
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Add a&nbsp;
            <Text b size={18}>
              Trivia
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Textarea
            required
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Write your question here"
            name="question"
            value={triviaFields?.question || ""}
            label="Question"
            onChange={handleChange}
          />
          <Textarea
            required
            label="Answer"
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Write your answer here"
            name="answer"
            value={triviaFields?.answer || ""}
            onChange={handleChange}
          />
          <Dropdown>
            <Dropdown.Button flat>{getDropdownDisplayValue()}</Dropdown.Button>
            <Dropdown.Menu
              aria-label="Dynamic Actions"
              items={catgories}
              selectionMode="multiple"
              selectedKeys={selected}
              onSelectionChange={setSelected}
            >
              {(item) => {
                let dropdownItems = item as TriviaCategory;
                return (
                  <Dropdown.Item key={dropdownItems.id}>
                    {dropdownItems.category_name}
                  </Dropdown.Item>
                );
              }}
            </Dropdown.Menu>
          </Dropdown>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler} type="reset">
            Close
          </Button>
          <Button auto type="submit">
            {type == "Add" ? "Add" : "Edit"}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
