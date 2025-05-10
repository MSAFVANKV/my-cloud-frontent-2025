import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useNavigate } from "react-router-dom";

type Props = {
  folderId?: string;
};

function BreadcrumbLine({ folderId }: Props) {
  const navigate = useNavigate();
  return (
    <Breadcrumb className="pb-3">
      <BreadcrumbList>
        {folderId && (
          <>
            <BreadcrumbItem>
              <BreadcrumbPage className="cursor-pointer" onClick={()=>{
                navigate(-1)
              }}>back</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}

        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage >{folderId}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default BreadcrumbLine;
