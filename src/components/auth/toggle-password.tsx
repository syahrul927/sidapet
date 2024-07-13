import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useMemo } from "react";
import { Button } from "../ui/button";

interface TogglePasswordProps {
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}
const TogglePassword = ({
  showPassword,
  setShowPassword,
}: TogglePasswordProps) => {
  const attr = useMemo(() => {
    if (showPassword) {
      return {
        label: "Hide",
        icon: EyeOffIcon,
      };
    }
    return {
      label: "Show",
      icon: EyeIcon,
    };
  }, [showPassword]);
  return (
    <Button
      variant={"link"}
      type="button"
      onClick={() => setShowPassword(!showPassword)}
    >
      {attr.label} Password <attr.icon className="ml-2" size={16} />
    </Button>
  );
};
export default TogglePassword;
