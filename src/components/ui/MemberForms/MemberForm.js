import {
    Box,
    Button,
    Fieldset,
    Input,
    Stack,
    Separator,
    Text
} from "@chakra-ui/react";
import { Field } from "components/ui/field.jsx";
import { Switch } from "components/ui/switch.jsx";
import { toaster } from "components/ui/toaster.jsx"
import {
    FileUploadList,
    FileUploadRoot,
    FileUploadTrigger,
} from "components/ui/file-upload.jsx";
import { HiUpload } from "react-icons/hi";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { createFamilyMember } from "services/api/api.js";

/* Todos:
[x] Token expiry 
[x] Error handling (toasts)
[ ] Validation (required fields, format, display directly at field)
[ ] Loading button (dont click twice while loading)
[ ] convert empty strings to null (or should this be done in the BE?)
*/

const MemberForm = () => {
    const [hasBirthName, setHasBirthName] = useState(false);
    const [hasDeathDate, setHasDeathDate] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            first_name: "",
            last_name: "",
            birth_date: "",
            birth_city: "",
            birth_country: "",
            email: "",
            telephone: "",
            street_number: "",
            plz: "",
            city: "",
        }
    });
    
    const [loading, setLoading] = useState(false);
    
    const onSubmit = async (data) => { 
        setLoading(true); 
        try {
            // Simulate API delay for testing loading state (remove in production)
            await new Promise(resolve => setTimeout(resolve, 3000)); 
            
            await createFamilyMember(data); // Actual API call

            reset();
            setHasBirthName(false);
            setHasDeathDate(false);
            toaster.create({
                title: `${data.first_name} ${data.last_name} erfolgreich gespeichert.`,
                type: "success",
              })
        } catch (error) {
            toaster.create({
                title: `${error}`,
                type: "error",
              })
        } finally {
            setLoading(false); // Stop loading state
        }
    };
    return (
        <>
            <Fieldset.Content>
                {/* ########## Personendaten ########## */}
                <Separator />
                <Text textStyle="sm" fontWeight="bold">Personendaten</Text>
                <Stack direction={{ base: "column", md: "row" }} w="full">
                    <Field required label="Vorname" floatingLabel>
                        <Input name="Vorname" {...register("first_name", {required: true})}/>
                    </Field>
                    <Field required label="Nachname" floatingLabel>
                        <Input name="Nachname" {...register("last_name", {required: true})}/>
                    </Field>
                </Stack>
                <Field required label="Geburtsdatum" floatingLabel>
                    <Input name="Geburtsdatum" type="date" {...register("birth_date", {required: true})}/>
                </Field>
                <Stack direction={{ base: "column", md: "row" }} w="full">
                    <Field required label="Geburtsort" floatingLabel>
                        <Input name="Geburtsort" {...register("birth_city", {required: true})}/>
                    </Field>
                    <Field required label="Geburtsland" floatingLabel>
                        <Input name="Geburtsland" {...register("birth_country", {required: true})}/>
                    </Field>
                </Stack>
                {/* ########## Bild hochladen ########## */}
                <FileUploadRoot maxFiles={5}>
                    <FileUploadTrigger asChild>
                        <Button variant="outline" size="sm">
                            <HiUpload /> Bild hochladen
                        </Button>
                    </FileUploadTrigger>
                    <FileUploadList showSize clearable />
                </FileUploadRoot>
                <Stack direction={{ base: "column", md: "row" }}>
                    <Box w={{ base: "35%", md: "35%" }}>
                        <Field label="Geburtsname?" orientation="horizontal">
                            <Switch
                                name="hasBirthName"
                                checked={hasBirthName}
                                onCheckedChange={(e) => setHasBirthName(e.checked)}
                            />
                        </Field>
                    </Box>
                    <Box w={{ base: "100%", md: "65%" }}>
                        {hasBirthName && (
                            <Field label="Geburtsname" floatingLabel>
                                <Input name="Geburtsname" {...register("birth_name")}/>
                            </Field>)}
                    </Box>
                </Stack>

                <Stack direction={{ base: "column", md: "row" }}>
                    <Box w={{ base: "35%", md: "35%" }}>
                        <Field label="Verstorben?" orientation="horizontal">
                            <Switch
                                name="hasDeathDate"
                                checked={hasDeathDate}
                                onCheckedChange={(e) => setHasDeathDate(e.checked)} />
                        </Field>
                    </Box>
                    <Box w={{ base: "100%", md: "65%" }}>
                        {hasDeathDate && (
                            <Field label="Sterbedatum" floatingLabel>
                                <Input name="Sterbedatum" type="date" {...register("death_date")}/>
                            </Field>)}
                    </Box>
                </Stack>
                {/* ########## Kontaktdaten ########## */}
                {!hasDeathDate && (
                    <>
                        <Separator />
                        <Text textStyle="sm" fontWeight="bold">Kontaktdaten</Text>
                        <Stack direction={{ base: "column", md: "row" }}>
                            <Field label="Email" floatingLabel>
                                <Input name="email" type="email" {...register("email")}/>
                            </Field>
                            <Field label="Telefon" floatingLabel>
                                <Input name="Telefon" {...register("telephone")}/>
                            </Field>
                        </Stack>
                        <Field label="Straße und Hausnummer" floatingLabel>
                            <Input name="Straße und Hausnummer" placeholder="Straße Hausnummer" {...register("street_number")}/>
                        </Field>
                        <Stack direction={{ base: "column", md: "row" }}>
                            <Field label="Postleitzahl" floatingLabel>
                                <Input name="Postleitzahl" placeholder="Postleitzahl" {...register("plz")}/>
                            </Field>
                            <Field label="Ort" floatingLabel>
                                <Input name="Ort" placeholder="Ort" {...register("city")}/>
                            </Field>
                        </Stack>
                    </>
                )}
            </Fieldset.Content>

            <Button 
                type="submit" 
                alignSelf="flex-end" 
                colorPalette="brand" 
                onClick={handleSubmit(onSubmit)}
                loading={loading}
                loadingText="Speichern...">
                Speichern
            </Button>
        </>
    )
};

export default MemberForm;