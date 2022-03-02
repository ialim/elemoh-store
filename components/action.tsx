import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import {
  IoAddOutline,
  IoCaretDownOutline,
  IoEyeOutline,
  IoPencilOutline,
  IoCashOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { useRouter } from "next/router";
import { ActionType } from "../types/types";

interface ActionProps {
  actions: ActionType[];
  values: any;
  dataType?: string;
  openModal?: () => void;
  setValues: Function;
  viewOpen?: () => void;
}

const Action = ({
  actions,
  values,
  dataType,
  openModal,
  setValues,
  viewOpen,
}: ActionProps) => {
  const router = useRouter();
  const handleClickEdit = (action: string) => {
    router.push({
      pathname: `/${action}-${dataType?.slice(0, -1)}`,
      query: { id: values?.id },
    });
  };
  const handleClick = (openIModal: any) => {
    setValues(values);
    openIModal();
  };
  return (
    <Menu>
      <MenuButton
        as={Button}
        colorScheme="purple"
        rightIcon={<IoCaretDownOutline />}
        variant="outline"
      >
        Action
      </MenuButton>
      <MenuList color="purple.600">
        {actions?.map((action) => (
          <>
            {action === "VIEW" && (
              <MenuItem
                key={action}
                icon={<IoEyeOutline />}
                onClick={() => handleClick(viewOpen)}
              >
                View
              </MenuItem>
            )}
            {action === "EDIT" && (
              <MenuItem
                key={action}
                icon={<IoPencilOutline />}
                onClick={() => handleClickEdit("update")}
              >
                Edit
              </MenuItem>
            )}
            {action === "ADD PAYMENT" && (
              <MenuItem key={action} icon={<IoAddOutline />}>
                Add Payment
              </MenuItem>
            )}
            {action === "VIEW PAYMENT" && (
              <MenuItem key={action} icon={<IoCashOutline />}>
                View Payment
              </MenuItem>
            )}
            {action === "DELETE" && (
              <MenuItem
                key={action}
                icon={<IoTrashOutline />}
                onClick={() => handleClick(openModal)}
              >
                Delete
              </MenuItem>
            )}
          </>
        ))}
      </MenuList>
    </Menu>
  );
};

Action.defaultProps = {
  dataType: "hello",
  openModal: null,
  viewOpen: null,
};

export default Action;
