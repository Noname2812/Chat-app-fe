import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [form] = Form.useForm();
  const searchValue = Form.useWatch("search", form);
  const navigate = useNavigate();
  const handleSearch = (value) => {
    if (value.search) {
      navigate(`/search/${value.search}`);
    }
  };
  return (
    <div className="p-1 rounded bg-white w-full">
      <Form
        onFinish={handleSearch}
        className="w-full flex justify-center gap-2 h-8"
        form={form}
        autoComplete="off"
      >
        <div className="h-full w-full relative">
          <Form.Item name="search" className="w-full">
            <Input
              type="text"
              className="text-sm w-full pr-8"
              variant={false}
              placeholder={"Search...."}
            />
          </Form.Item>
          <FontAwesomeIcon
            className={`${
              searchValue ? "visible" : "invisible"
            } absolute top-2 right-2 leading-8 cursor-pointer`}
            onClick={() => form.resetFields()}
            icon={faXmark}
            size="1x"
          />
        </div>
        <Button htmlType="submit" className="bg-[#FA5130] rounded">
          <FontAwesomeIcon color="black" icon={faSearch} />
        </Button>
      </Form>
    </div>
  );
};

export default SearchInput;
