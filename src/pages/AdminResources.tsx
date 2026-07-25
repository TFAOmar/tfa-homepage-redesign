import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AdminTopBar from "@/components/admin/AdminTopBar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ArrowLeft, Upload, Loader2, Trash2, Plus, X, Pencil } from "lucide-react";
import { toast } from "sonner";
import { SEOHead } from "@/components/seo";
import {
  useResourceCategories,
  useResources,
  useCreateCategory,
  useDeleteCategory,
  useUploadResource,
  useUpdateResource,
  useDeleteResource,
  formatFileSize,
  type Resource,
} from "@/hooks/useResources";

const MAX_SIZE = 20 * 1024 * 1024;

const AdminResources = () => {
  const { data: categories = [] } = useResourceCategories();
  const { data: resources = [], isLoading } = useResources();
  const createCategory = useCreateCategory();
  const deleteCategory = useDeleteCategory();
  const uploadResource = useUploadResource();
  const updateResource = useUpdateResource();
  const deleteResource = useDeleteResource();

  const [uploadOpen, setUploadOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [newCatName, setNewCatName] = useState("");

  const [editing, setEditing] = useState<Resource | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editCategoryId, setEditCategoryId] = useState("");

  const resetUpload = () => {
    setTitle("");
    setDescription("");
    setCategoryId("");
    setFile(null);
  };

  const handleUpload = async () => {
    if (!title.trim() || !categoryId || !file) {
      toast.error("Please fill in title, category, and file.");
      return;
    }
    if (file.size > MAX_SIZE) {
      toast.error("File must be 20MB or smaller.");
      return;
    }
    try {
      await uploadResource.mutateAsync({
        title: title.trim(),
        description: description.trim() || undefined,
        category_id: categoryId,
        file,
      });
      toast.success("Resource uploaded.");
      resetUpload();
      setUploadOpen(false);
    } catch (err: any) {
      toast.error("Upload failed", { description: err?.message });
    }
  };

  const handleAddCategory = async () => {
    if (!newCatName.trim()) return;
    try {
      await createCategory.mutateAsync(newCatName);
      toast.success("Category added.");
      setNewCatName("");
    } catch (err: any) {
      toast.error("Could not add category", { description: err?.message });
    }
  };

  const handleDeleteCategory = async (id: string, name: string) => {
    const inUse = resources.some((r) => r.category_id === id);
    if (inUse) {
      toast.error("Category has resources", {
        description: `Move or delete resources in "${name}" first.`,
      });
      return;
    }
    try {
      await deleteCategory.mutateAsync(id);
      toast.success("Category deleted.");
    } catch (err: any) {
      toast.error("Could not delete", { description: err?.message });
    }
  };

  const openEdit = (r: Resource) => {
    setEditing(r);
    setEditTitle(r.title);
    setEditDescription(r.description ?? "");
    setEditCategoryId(r.category_id);
  };

  const handleSaveEdit = async () => {
    if (!editing) return;
    try {
      await updateResource.mutateAsync({
        id: editing.id,
        title: editTitle.trim(),
        description: editDescription.trim() || null,
        category_id: editCategoryId,
      });
      toast.success("Resource updated.");
      setEditing(null);
    } catch (err: any) {
      toast.error("Update failed", { description: err?.message });
    }
  };

  const handleDelete = async (r: Resource) => {
    try {
      await deleteResource.mutateAsync(r);
      toast.success("Resource deleted.");
    } catch (err: any) {
      toast.error("Delete failed", { description: err?.message });
    }
  };

  return (
    <>
      <SEOHead title="Resource Library — Admin" description="Manage TFA resource library" noIndex />
      <AdminTopBar />
      <div className="min-h-screen py-16 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <Button variant="ghost" size="sm" asChild className="mb-2">
                <Link to="/admin">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Admin
                </Link>
              </Button>
              <h1 className="text-3xl md:text-4xl font-bold text-navy">Resource Library</h1>
              <p className="text-muted-foreground">Upload and manage documents available to advisors.</p>
            </div>

            <Dialog open={uploadOpen} onOpenChange={(o) => { setUploadOpen(o); if (!o) resetUpload(); }}>
              <DialogTrigger asChild>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Document
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Document</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="desc">Description</Label>
                    <Textarea id="desc" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                  </div>
                  <div>
                    <Label>Category *</Label>
                    <Select value={categoryId} onValueChange={setCategoryId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((c) => (
                          <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="file">PDF File * (max 20MB)</Label>
                    <Input
                      id="file"
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    />
                    {file && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {file.name} · {formatFileSize(file.size)}
                      </p>
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setUploadOpen(false)}>Cancel</Button>
                  <Button onClick={handleUpload} disabled={uploadResource.isPending}>
                    {uploadResource.isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
                    Upload
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-base">Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((c) => {
                  const count = resources.filter((r) => r.category_id === c.id).length;
                  return (
                    <Badge key={c.id} variant="secondary" className="gap-1.5 pl-3 pr-1.5 py-1.5">
                      {c.name} <span className="text-muted-foreground">({count})</span>
                      <button
                        onClick={() => handleDeleteCategory(c.id, c.name)}
                        className="ml-1 rounded-full hover:bg-destructive/20 p-0.5"
                        aria-label={`Delete ${c.name}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  );
                })}
                {categories.length === 0 && (
                  <p className="text-sm text-muted-foreground">No categories yet.</p>
                )}
              </div>
              <div className="flex gap-2 max-w-md">
                <Input
                  placeholder="New category name"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
                />
                <Button onClick={handleAddCategory} disabled={createCategory.isPending || !newCatName.trim()}>
                  <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Documents ({resources.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-10">
                  <Loader2 className="h-6 w-6 animate-spin text-accent" />
                </div>
              ) : resources.length === 0 ? (
                <p className="text-center text-muted-foreground py-10">No documents uploaded yet.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Updated</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resources.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell className="font-medium">{r.title}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{r.category?.name ?? "—"}</Badge>
                        </TableCell>
                        <TableCell>{formatFileSize(r.file_size)}</TableCell>
                        <TableCell>{new Date(r.updated_at).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => openEdit(r)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete "{r.title}"?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This removes the file and its record permanently.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(r)}>Delete</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Resource</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea rows={3} value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
                </div>
                <div>
                  <Label>Category</Label>
                  <Select value={editCategoryId} onValueChange={setEditCategoryId}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
                <Button onClick={handleSaveEdit} disabled={updateResource.isPending}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default AdminResources;