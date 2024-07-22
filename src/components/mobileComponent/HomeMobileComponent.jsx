import MenuRoomChats from "../MenuRoomChats";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  getRoomsState,
  setRoomSelected,
} from "../../redux/reducers/roomReducer";
import { Button } from "antd";
import MainChatComponent from "../MainChatComponent";
import FormChat from "../FormChat";

const HomeMobileComponent = () => {
  const { roomSelected } = useAppSelector(getRoomsState);
  const dispatch = useAppDispatch();
  return (
    <div className="w-full">
      <div className={`w-full ${roomSelected ? "hidden" : "block"}`}>
        <MenuRoomChats />
      </div>
      <div
        className={`flex flex-col gap-2  ${roomSelected ? "block" : "hidden"}`}
      >
        <div>
          <Button onClick={() => dispatch(setRoomSelected(undefined))}>
            Back
          </Button>
        </div>
        <div>
          <MainChatComponent />
          <FormChat />
        </div>
      </div>
    </div>
  );
};

export default HomeMobileComponent;
