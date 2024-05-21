import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/format";

interface DataCardProps {
  value: number;
  label: string;
  shouldFomat?: boolean;
}

export const DataCard = ({ value, label, shouldFomat }: DataCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
      </CardHeader>

      <CardContent className="text-xl font-bold">
        {shouldFomat ? formatPrice(value) : value}
      </CardContent>
    </Card>
  );
};
