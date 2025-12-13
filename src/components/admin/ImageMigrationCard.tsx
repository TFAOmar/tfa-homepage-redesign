import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, HardDrive, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { migrateLocalStorageAdvisors, migrateDatabase, MigrationResult } from "@/lib/migrateLocalStorage";

const ImageMigrationCard = () => {
  const [isMigratingLocal, setIsMigratingLocal] = useState(false);
  const [isMigratingDb, setIsMigratingDb] = useState(false);
  const [localResult, setLocalResult] = useState<MigrationResult | null>(null);
  const [dbResult, setDbResult] = useState<MigrationResult | null>(null);

  const handleLocalMigration = async () => {
    setIsMigratingLocal(true);
    setLocalResult(null);
    
    try {
      const result = await migrateLocalStorageAdvisors();
      setLocalResult(result);
      
      if (result.migrated > 0) {
        toast.success("LocalStorage Migration Complete", {
          description: `Migrated ${result.migrated} of ${result.total} advisors`,
        });
      } else if (result.total === 0) {
        toast.info("No Data Found", {
          description: "No advisors found in localStorage to migrate",
        });
      } else if (result.skipped === result.total) {
        toast.info("Already Migrated", {
          description: "All advisors already exist in database",
        });
      }
      
      if (result.failed > 0) {
        toast.error("Some Migrations Failed", {
          description: `${result.failed} advisors failed to migrate`,
        });
      }
    } catch (error) {
      toast.error("Migration Failed", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsMigratingLocal(false);
    }
  };

  const handleDatabaseMigration = async () => {
    setIsMigratingDb(true);
    setDbResult(null);
    
    try {
      const result = await migrateDatabase();
      setDbResult(result);
      
      if (result.migrated > 0) {
        toast.success("Database Migration Complete", {
          description: `Migrated ${result.migrated} of ${result.total} images to Storage`,
        });
      } else if (result.total === 0) {
        toast.info("No Base64 Images Found", {
          description: "No base64 images found in database to migrate",
        });
      }
      
      if (result.failed > 0) {
        toast.error("Some Migrations Failed", {
          description: `${result.failed} images failed to migrate`,
        });
      }
    } catch (error) {
      toast.error("Migration Failed", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsMigratingDb(false);
    }
  };

  const renderResult = (result: MigrationResult | null, label: string) => {
    if (!result) return null;
    
    return (
      <div className="mt-3 p-3 rounded-lg bg-secondary/50 text-sm">
        <div className="flex items-center gap-2 mb-2">
          {result.failed === 0 ? (
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          ) : (
            <XCircle className="h-4 w-4 text-red-500" />
          )}
          <span className="font-medium">{label} Results</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-muted-foreground">
          <div>Total: {result.total}</div>
          <div>Migrated: {result.migrated}</div>
          {result.skipped !== undefined && <div>Skipped: {result.skipped}</div>}
          <div>Failed: {result.failed}</div>
        </div>
        {result.errors.length > 0 && (
          <div className="mt-2 text-red-400 text-xs">
            {result.errors.slice(0, 3).map((err, i) => (
              <div key={i} className="truncate">{err}</div>
            ))}
            {result.errors.length > 3 && (
              <div>...and {result.errors.length - 3} more errors</div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="glass animate-fade-in">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-accent" />
          <CardTitle className="text-navy">Image Migration Tools</CardTitle>
        </div>
        <CardDescription>
          Migrate advisor images from base64 to Supabase Storage
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* LocalStorage Migration */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <HardDrive className="h-4 w-4" />
                LocalStorage Migration
              </h3>
              <p className="text-sm text-muted-foreground">
                Migrate advisors from browser localStorage to database
              </p>
            </div>
            <Button 
              onClick={handleLocalMigration} 
              disabled={isMigratingLocal}
              variant="outline"
              size="sm"
            >
              {isMigratingLocal ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Migrating...
                </>
              ) : (
                "Migrate"
              )}
            </Button>
          </div>
          {renderResult(localResult, "LocalStorage")}
        </div>

        <div className="border-t border-border/50" />

        {/* Database Migration */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Database className="h-4 w-4" />
                Database Migration
              </h3>
              <p className="text-sm text-muted-foreground">
                Convert existing base64 images in database to Storage URLs
              </p>
            </div>
            <Button 
              onClick={handleDatabaseMigration} 
              disabled={isMigratingDb}
              variant="outline"
              size="sm"
            >
              {isMigratingDb ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Migrating...
                </>
              ) : (
                "Migrate"
              )}
            </Button>
          </div>
          {renderResult(dbResult, "Database")}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageMigrationCard;
