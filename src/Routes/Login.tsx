import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Typography, Card } from "antd";

const { Title } = Typography;

const Login = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log("Login data:", data);
    // TODO: Send to backend
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <Title level={3} className="text-center text-green-700">
          تسجيل الدخول
        </Title>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
          <div>
            <label className="block mb-1 text-right">اسم المستخدم</label>
            <Controller
              name="username"
              control={control}
              render={({ field }) => <Input {...field} placeholder="اسم المستخدم" />}
            />
          </div>

          <div>
            <label className="block mb-1 text-right">كلمة المرور</label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password {...field} placeholder="كلمة المرور" />
              )}
            />
          </div>

          <Button
            htmlType="submit"
            type="primary"
            className="bg-green-600 w-full"
          >
            دخول
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
