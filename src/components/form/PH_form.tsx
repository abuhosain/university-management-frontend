/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "antd";
import { ReactNode } from "react";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";

type TFormSubmit = {
    onSubmit : SubmitHandler<FieldValues>;
    children : ReactNode;
} & TFormConfig

type TFormConfig = {
    defaultValues? : Record<string, any>;
    resolver? : any;
} 

const PH_form = ({ onSubmit, children, defaultValues, resolver } : TFormSubmit) => {
    const formConfig : TFormConfig = {};
    if(defaultValues){
        formConfig["defaultValues"] = defaultValues
    }
    if(resolver){
        formConfig["resolver"] = resolver
    }
  const methods = useForm(formConfig);
  return (
    <FormProvider {...methods}>
      <Form  layout="vertical" onFinish  ={methods.handleSubmit(onSubmit)}>{children}</Form>
    </FormProvider>
  );
};

export default PH_form;
