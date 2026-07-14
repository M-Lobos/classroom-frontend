import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreate, useGetIdentity } from "@refinedev/core";
import { useNavigate } from "react-router";
import * as z from "zod";
import { CreateView } from "@/components/refine-ui/views/create-view";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User } from "@/types/types";

const joinSchema = z.object({
    inviteCode: z.string().min(3, "Invite Code is required")
});

type JoinFormValue = z.infer<typeof joinSchema>;

const EnrollmentJoin = () => {
    const navigate = useNavigate();

    const {
        mutateAsync: joinEnrollment,
        mutation: { isPending },
    } = useCreate();

    const { data: currentUser } = useGetIdentity<User>()

    const form = useForm<JoinFormValue>({
        resolver: zodResolver(joinSchema),
        defaultValues: {
            inviteCode: "",
        },
    });

    const inviteCode = form.watch("inviteCode");

    const onSubmit = async (values: JoinFormValue) => {
        if (!currentUser?.id) return

        const response = await joinEnrollment({
            resource: "enrollments/join",
            values: {
                inviteCode: values.inviteCode,
                studentId: currentUser.id,
            }
        });

        navigate("enrollments/confirm", {
            state: {
                enrollment: response?.data,
            }
        });
    }

    const isSubmitDisabled = isPending || !currentUser?.id || !inviteCode;

    return (
        <CreateView className="class-view">
            <Breadcrumb />
            <h1 className="page-title">Join by invited code</h1>
            <div className="intro-row">
                <p>Enter the invite code provided by your instructor.</p>
            </div>

            <Separator />

            <div className="my-4 flex items-center">
                <Card className="class-form-carad">
                    <CardHeader className="relative z-10">
                        <CardTitle className="text-2xl pb-0 font-bold text-gradient-orange">
                            Join Class
                        </CardTitle>
                    </CardHeader>

                    <Separator />

                    <CardContent className="mt-7">
                        <Form {...form}>
                            <form
                                className="space-y-5"
                                onSubmit={form.handleSubmit(onSubmit)}
                            >
                                <FormField
                                    control={form.control}
                                    name="inviteCode"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Invite Code <span className="text-orange-600">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter invite code" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormItem>
                                    <FormLabel>Student</FormLabel>
                                    <FormControl>
                                        <Input
                                            value={currentUser?.email ?? "Not signed in"}
                                            readOnly
                                        />
                                    </FormControl>
                                </FormItem>

                                <Button type="submit" size="lg" disabled={isSubmitDisabled}>
                                    {isPending ? "Joining..." : "Join Class"}
                                </Button>

                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>

        </CreateView>
    );
};

export default EnrollmentJoin;