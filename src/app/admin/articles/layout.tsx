import { FormPreviewProvider } from "@/provider/form-preview-context";

const Layout = ({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) => {
  return (
    <FormPreviewProvider>
      {children}
      <div className="relative">{modal}</div>
    </FormPreviewProvider>
  );
};

export default Layout;
