import React, { useState } from "react";
import './upload.css';
import { Image, Upload, Button, Form, Input, InputNumber, Select, Flex} from 'antd';
import { PlusOutlined } from "@ant-design/icons";

const { TextArea } = Input;

function ModalModify({ productId }) {
  const [form] = Form.useForm();
  const [product, setProduct] = useState({
    productName: "Cabbage",
    price: 12,
    percentSale: 2,
    brand: "Minh",
    remain: 12,
    description: "Example description",
    category: "1",
    unit: "kg",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);

  const handlePreview = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.originFileObj);
    reader.onload = () => setPreviewImage(reader.result);
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onFinish = async (values) => {
    setIsSaving(true);
    try {
      const updatedProduct = { ...product, ...values };
      console.log("Updated Product:", updatedProduct);

      // Make an API call to save the edited data here
      alert("Changes saved successfully!");

      // Reset state
      setProduct(updatedProduct);
      setIsChanged(false); // Reset change detection
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleValuesChange = (_, allValues) => {
    // Compare current form values with the initial product state
    const hasChanges = Object.keys(product).some(
      (key) => product[key] !== allValues[key]
    );
    setIsChanged(hasChanges);
  };

  return (
    <div>
      <div className="modal-content">
        <div className="im-area">
          <div className="img-list-admin">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              className="vertical-upload"
              maxCount={4}
              beforeUpload={() => false}
            >
              {fileList.length >= 4 ? null : (
                <button
                  style={{
                    border: 0,
                    background: 'none',
                  }}
                  type="button"
                >
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </button>
              )}
            </Upload>
          </div>
          <div className="img-product">
            {previewImage && <Image src={previewImage} alt="Preview" />}
          </div>
        </div>

        <div className="info-area">
          <Form
            form={form}
            initialValues={product}
            onValuesChange={handleValuesChange} 
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="productName"
              rules={[{ required: true, message: 'Please input product name!' }]}
            >
              <Input
                style={{ width: '400px', fontWeight: 'bold', fontSize: '24px' }}
                placeholder="Enter product name"
                maxLength={30}
              />
            </Form.Item>

            <div className="container-price-remain">
              <Form.Item
                name="price"
                rules={[{ required: true, message: 'Please input price!' }]}
              >
                <InputNumber
                  className="input-price"
                  placeholder="Price"
                  addonAfter="đ"
                  min={0}
                />
              </Form.Item>

              <Form.Item name="percentSale">
                <InputNumber
                  className="input-percent-sale margin-left8"
                  placeholder="Off"
                  addonAfter="%"
                  min={0}
                  max={99}
                />
              </Form.Item>

              <Form.Item
                label="Remain"
                name="remain"
                rules={[{ required: true, message: 'Please input remaining stock!' }]}
              >
                <InputNumber placeholder="Qty" className="input-qty" min={0} />
              </Form.Item>
            </div>

            <Form.Item
              label="Brand"
              name="brand"
              rules={[{ required: true, message: 'Please input brand name!' }]}
            >
              <Input style={{ width: '200px' }} placeholder="Brand name" />
            </Form.Item>

            <Form.Item name="description">
              <TextArea
                className="description"
                showCount
                maxLength={100}
                placeholder="Description"
              />
            </Form.Item>

            <div className="container-unit-category">
              <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true, message: 'Please select category!' }]}
              >
                <Select />
              </Form.Item>

              <Form.Item
                label="Unit"
                name="unit"
                rules={[{ required: true, message: 'Please input unit!' }]}
              >
                <Input placeholder="Enter unit" />
              </Form.Item>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              disabled={!isChanged} 
              loading={isSaving}
            >
              Save Changes
            </Button>
          </Form>
          <Flex wrap gap="small">
          <Button
              type="primary"
              danger
              style={{marginTop:'8px'}}
            >
              Delete
            </Button>
          </Flex>
        </div>
      </div>
    </div>
  );
}

export default ModalModify;
