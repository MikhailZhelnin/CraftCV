import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/shared/ui/card";

import { Button } from "@/shared/ui/button";

import type { ProfileSummary } from "../model/profile.types";

interface ProfileCardProps {
    profile: ProfileSummary;
    onEdit: (id: string) => void;
};

export function ProfileCard({ profile, onEdit }: ProfileCardProps) {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>{profile.name}</CardTitle>
                <CardDescription>{profile.description || "No description"}</CardDescription>
            </CardHeader>

            <CardFooter className="mt-auto justify-between">
                <span className="text-xs text-muted-foreground">
                    {new Date(profile.updatedAt).toLocaleDateString()}
                </span>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(profile.id)}
                >
                    Edit
                </Button>
            </CardFooter>
        </Card>
    );
};