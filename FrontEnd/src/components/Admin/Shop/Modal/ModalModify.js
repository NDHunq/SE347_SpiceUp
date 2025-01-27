import React, { useState } from "react";
import './upload.css';
import { Modal, Image, Upload, Button, Form, Input, InputNumber, Select, Flex, Popconfirm, message } from 'antd';
import { PlusOutlined } from "@ant-design/icons";
import instance from "../../../../utils/axiosCustomize";
import { useEffect } from "react";
const { TextArea } = Input;
function ModalModify(props) {
  const [form] = Form.useForm();
  const [product, setProduct] = useState();
  const [isSaving, setIsSaving] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);
  const [categories, setCategories] = useState(props.categories);
  const confirmDeleteProduct = async (e) => {
    try {
      const response = await instance.delete(`api/v1/product/${props.id}`);
      if (response.status === 200 || response.status === 204) {
        message.success('Delete successful');
        if (props.refresh) {
          props.refresh();
        }
      } else {
        message.error('Delete failed');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('An error occurred');
    }


  };
  useEffect(() => {
    const updatedProduct = {
      id: props.id,
      product_name: props.name,
      price: props.price,
      discount: props.discount*100,
      brand: props.brand,
      stock: props.stock,
      description: props.description,
      category: props.category,
      value: props.value,
      product_images: props.urls_img
    };

    setProduct(updatedProduct);
    setCategories(props.categories || []);

    form.setFieldsValue(updatedProduct);
  }, [props.name, props.price, props.discount, props.brand, props.stock, props.description, props.category, props.value, props.categories, form]);

  useEffect(() => {
    if (!product || !product.product_images || product.product_images.length === 0) {
      return;
    }

    const fetchImage = async () => {
      try {
        const promises = product.product_images.map((fileId) =>
          instance.get(`api/v1/image/${fileId}`, { responseType: 'arraybuffer' })
        );
        const responses = await Promise.all(promises);
        const tempFileList = responses.map((response, index) => {
          const blob = new Blob([response.data], { type: response.headers["content-type"] });
          const url = URL.createObjectURL(blob);
          return {
            uid: product.product_images[index],
            name: `Image ${index + 1}`,
            status: 'done',
            url: url,
            originFileObj: blob,
          };
        });
        setFileList(tempFileList);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImage();

    return () => {
      fileList.forEach((file) => {
        if (file.url) {
          URL.revokeObjectURL(file.url); // Dọn dẹp các URL Object
        }
      });
    };
  }, [product?.product_images]);
  useEffect(() => {
    if (fileList.length > 0) {
      setPreviewImage(fileList[0].url); // Đặt URL ảnh đầu tiên
    }
  }, [fileList]);


  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }

    setPreviewImage(file.url || file.preview); // Đặt URL của ảnh
    Modal.info({
      content: <Image src={file.url || file.preview} alt="Preview" />,
      onOk: () => { },
      onClose: () => { }
    });

  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await instance.post('/api/v1/image/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status !== 200) {
        throw new Error(`Upload failed with status ${response.status}`);
      }


      const result = await response.data;
      console.log(result);
      console.log('Uploaded fileId:', result.file?.fileId);
      return result.file?.fileId;
    } catch (error) {
      console.error('Error during upload:', error);
      return null;
    }
  };
  const handleChange = ({ fileList: newFileList }) => {
    setIsChanged(true);
    if (newFileList.length === 0) {
      setIsChanged(false);
      setPreviewImage(null);
    }
    setFileList(newFileList);

  };
  const handleRemove = (file) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      product_images: prevProduct.product_images.filter(imageId => imageId !== file.uid),
    }));
  };

  const onFinish = async (values) => {
    setIsSaving(true);
    try {
      const newFiles = fileList.filter((file) => !product.product_images.includes(file.uid));

      const uploadedFileIds = [];
      for (const file of newFiles) {
        const fileId = await uploadFile(file.originFileObj);
        if (fileId) {
          uploadedFileIds.push(fileId);
        }
      }
      const updatedProduct = {
        ...product,
        ...values,
        product_images: [...product.product_images, ...uploadedFileIds],
        discount: values.discount / 100
      };

      console.log("Updated Product:", updatedProduct);

      // Reset state
      setProduct(updatedProduct);
      setIsChanged(false);
      const formData = {
        ...updatedProduct,
        product_images: updatedProduct.product_images,
      };

      console.log("a",formData);
      // call api with form data
      const response = await instance.patch(`/api/v1/product/${product.id}`, formData);
      if (response.status === 200) {
        message.success('Changes saved successfully!');
        if (props.refresh) {
          props.refresh();
        }
      } else {
        message.error('Failed to save changes');
      }


    } catch (error) {
      console.error("Error saving changes:", error);
      message.error("Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleValuesChange = (_, allValues) => {

    const hasChanges = Object.keys(product).some(
      (key) => product[key] !== allValues[key]
    );
    setIsChanged(hasChanges);
  };
  const saveChange = () => {
    console.log(form);
  }

  return (
    <div>
      <div className="modal-content">
        <div className="im-area">
          <div className="img-list-admin">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onRemove={handleRemove}
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

        </div>

        <div className="info-area-admin">
          <Form
            form={form}
            initialValues={product}
            onValuesChange={handleValuesChange}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="product_name"
              rules={[{ required: true, message: 'Please input product name!' }]}
            >
              <Input
                style={{ width: '400px', fontWeight: 'bold', fontSize: '24px' }}
                placeholder="Enter product name"
                maxLength={30}
              />
            </Form.Item>

            <div className="container-price-remain">
              <div className="price-line">

                <Form.Item
                  name="price"
                  rules={[{ required: true, message: 'Please input price!' }]}
                >
                  <InputNumber
                    className="input-price"
                    placeholder="Price"
                    addonAfter="đ"
                    min={1}
                  />
                </Form.Item>

                <Form.Item name="discount" >
                  <InputNumber
                    className="input-percent-sale margin-left8"
                    placeholder="Off"
                    addonAfter="%"
                    min={0}
                    max={100}
                  />
                </Form.Item>
              </div>
              <Form.Item
                label="Remain"
                name="stock"
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
                <Select style={{ width: '200px' }}
                >
                  {categories.map((category) => (
                    <Select.Option key={category.id} value={category.id}>
                      {category.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Unit"
                name="value"
                rules={[{ required: true, message: 'Please input unit!' }]}
              >
                <Input placeholder="Enter unit" />
              </Form.Item>
            </div>
            <div class="button-line">
              <Button
                type="primary"
                htmlType="submit"
                disabled={!isChanged}
                loading={isSaving}
                onClick={saveChange}
              >
                Save Changes
              </Button>
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={confirmDeleteProduct}
                okText="Delete"
                cancelText="Cancel"
              >
                <Button
                  type="primary"
                  danger
                  style={{ marginLeft: '8px' }}
                >
                  Delete
                </Button>
              </Popconfirm>
            </div>
           
          </Form>
         
        </div>
      </div>

    </div>
  );
}

export default ModalModify;
