import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DynamicAdvisor, AdvisorStatus } from "@/stores/advisorStore";
import { Edit, Eye, EyeOff, Archive, Trash2, MoreHorizontal, CheckCircle2, ChevronUp, ChevronDown, MapPin, Shield } from "lucide-react";
import { format } from "date-fns";

interface AdvisorTableProps {
  advisors: DynamicAdvisor[];
  selectedIds: string[];
  onSelectChange: (ids: string[]) => void;
  onEdit: (advisor: DynamicAdvisor) => void;
  onApprove: (id: string) => void;
  onHide: (id: string) => void;
  onArchive: (id: string) => void;
  onRestore: (id: string) => void;
  onDelete: (id: string) => void;
}

type SortField = "name" | "title" | "state" | "status" | "createdAt";
type SortDirection = "asc" | "desc";

const statusStyles: Record<AdvisorStatus, string> = {
  published: "bg-green-100 text-green-800 border-green-200",
  pending: "bg-orange-100 text-orange-800 border-orange-200",
  hidden: "bg-gray-100 text-gray-800 border-gray-200",
  archived: "bg-red-100 text-red-800 border-red-200",
};

const statusLabels: Record<AdvisorStatus, string> = {
  published: "Published",
  pending: "Pending",
  hidden: "Hidden",
  archived: "Archived",
};

const AdvisorTable = ({
  advisors,
  selectedIds,
  onSelectChange,
  onEdit,
  onApprove,
  onHide,
  onArchive,
  onRestore,
  onDelete,
}: AdvisorTableProps) => {
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedAdvisors = [...advisors].sort((a, b) => {
    if (sortField === "createdAt") {
      const aTime = new Date(a.createdAt).getTime();
      const bTime = new Date(b.createdAt).getTime();
      return sortDirection === "asc" ? aTime - bTime : bTime - aTime;
    }
    
    const aVal = a[sortField] as string;
    const bVal = b[sortField] as string;
    
    return sortDirection === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
  });

  const handleSelectAll = (checked: boolean) => {
    onSelectChange(checked ? advisors.map((a) => a.id) : []);
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    onSelectChange(checked ? [...selectedIds, id] : selectedIds.filter((i) => i !== id));
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };

  if (advisors.length === 0) {
    return (
      <div className="glass rounded-xl p-12 text-center">
        <div className="text-muted-foreground">No advisors found matching your criteria.</div>
      </div>
    );
  }

  return (
    <div className="glass rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/30 hover:bg-secondary/30">
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedIds.length === advisors.length && advisors.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="w-16">Photo</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                <div className="flex items-center gap-1">
                  Name <SortIcon field="name" />
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("title")}>
                <div className="flex items-center gap-1">
                  Title <SortIcon field="title" />
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("state")}>
                <div className="flex items-center gap-1">
                  Location <SortIcon field="state" />
                </div>
              </TableHead>
              <TableHead>Specialties</TableHead>
              <TableHead>Licenses</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                <div className="flex items-center gap-1">
                  Status <SortIcon field="status" />
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("createdAt")}>
                <div className="flex items-center gap-1">
                  Date Added <SortIcon field="createdAt" />
                </div>
              </TableHead>
              <TableHead className="w-16">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAdvisors.map((advisor) => (
              <TableRow key={advisor.id} className="hover:bg-secondary/10 transition-colors">
                <TableCell>
                  <Checkbox
                    checked={selectedIds.includes(advisor.id)}
                    onCheckedChange={(checked) => handleSelectOne(advisor.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell>
                  {advisor.image ? (
                    <img src={advisor.image} alt={advisor.name} className="w-10 h-10 rounded-full object-cover border border-accent/20" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-navy/30 to-accent/30 flex items-center justify-center text-xs font-bold text-navy">
                      {advisor.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium text-navy">{advisor.name}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{advisor.title}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3 text-accent" />
                    {advisor.city}, {advisor.state}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1 max-w-[200px]">
                    {advisor.specialties.slice(0, 2).map((s, i) => (
                      <Badge key={i} variant="secondary" className="text-[10px] bg-accent/10 text-accent border-accent/20">
                        {s}
                      </Badge>
                    ))}
                    {advisor.specialties.length > 2 && (
                      <Badge variant="secondary" className="text-[10px]">+{advisor.specialties.length - 2}</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 flex-wrap">
                    {advisor.licenses.slice(0, 2).map((l, i) => (
                      <div key={i} className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                        <Shield className="h-2.5 w-2.5 text-accent" />
                        {l}
                      </div>
                    ))}
                    {advisor.licenses.length > 2 && (
                      <span className="text-[10px] text-muted-foreground">+{advisor.licenses.length - 2}</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={`${statusStyles[advisor.status]} border`}>
                    {statusLabels[advisor.status]}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {format(new Date(advisor.createdAt), "MMM d, yyyy")}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-background z-50">
                      <DropdownMenuItem onClick={() => onEdit(advisor)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      {advisor.status === "pending" && (
                        <DropdownMenuItem onClick={() => onApprove(advisor.id)}>
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                          Approve
                        </DropdownMenuItem>
                      )}
                      {advisor.status !== "hidden" && advisor.status !== "archived" && (
                        <DropdownMenuItem onClick={() => onHide(advisor.id)}>
                          <EyeOff className="h-4 w-4 mr-2" />
                          Hide
                        </DropdownMenuItem>
                      )}
                      {advisor.status === "hidden" && (
                        <DropdownMenuItem onClick={() => onApprove(advisor.id)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Publish
                        </DropdownMenuItem>
                      )}
                      {advisor.status !== "archived" && (
                        <DropdownMenuItem onClick={() => onArchive(advisor.id)}>
                          <Archive className="h-4 w-4 mr-2" />
                          Archive
                        </DropdownMenuItem>
                      )}
                      {advisor.status === "archived" && (
                        <DropdownMenuItem onClick={() => onRestore(advisor.id)}>
                          <Eye className="h-4 w-4 mr-2 text-green-600" />
                          Restore
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => onDelete(advisor.id)} className="text-red-600 focus:text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Permanently
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdvisorTable;
