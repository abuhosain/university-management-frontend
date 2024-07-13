import { ReactNode } from "react";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";

type TFormSubmit = {
    onSubmit : SubmitHandler<FieldValues>;
    children : ReactNode;
} & TFormConfig

type TFormConfig = {
    defaultValues? : Record<string, any>
} 

const PH_form = ({ onSubmit, children, defaultValues } : TFormSubmit) => {
    const formConfig : TFormConfig = {};
    if(defaultValues){
        formConfig["defaultValues"] = defaultValues
    }
  const methods = useForm(formConfig);
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default PH_form;
