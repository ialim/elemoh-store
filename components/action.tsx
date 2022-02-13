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

type ActionType = "VIEW" | "EDIT" | "ADD PAYMENT" | "VIEW PAYMENT" | "DELETE";

interface ActionProps {
  actions: ActionType[];
  id: string;
  dataType?: string;
}

const Action = ({ actions, id, dataType }: ActionProps) => {
  const router = useRouter();
  const handleClick = (action: string) => {
    router.push({ pathname: `/${action}-${dataType}`, query: { id } });
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
              <MenuItem key={action} icon={<IoEyeOutline />}>
                View
              </MenuItem>
            )}
            {action === "EDIT" && (
              <MenuItem
                key={action}
                icon={<IoPencilOutline />}
                onClick={() => handleClick("edit")}
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
              <MenuItem key={action} icon={<IoTrashOutline />}>
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
};

export default Action;
