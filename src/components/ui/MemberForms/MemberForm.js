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
import {
    FileUploadList,
    FileUploadRoot,
    FileUploadTrigger,
} from "components/ui/file-upload.jsx";
import { HiUpload } from "react-icons/hi";
import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";

import { createFamilyMember, updateFamilyMember } from 'services/api/api.js';  // Import the API function
import { toaster } from "components/ui/toaster.jsx"
import { MemberContext } from 'contexts/MemberContext.js';

import useSaveMember from "hooks/useSaveMember.js";

// Input validation
const nameRegex = /^[A-Za-zÄÖÜäöüß-]+$/; // Allows letters, hyphens, and German umlauts
const cityRegex = /^[A-Za-zÄÖÜäöüß()\s-]+$/; // Allows letters, hyphens, spaces, parentheses, and umlauts
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Standard email format
const telephoneRegex = /^[0-9+\s()-]{7,20}$/; // Allows digits, spaces, +, (), - (7-20 characters)
const streetNumberRegex = /^[A-Za-zÄÖÜäöüß\s.-]+\s\d+[A-Za-z]?$/; // Matches "Müllerstraße 12", "Hauptstr. 5", "Goethe-Straße 7A"

const validations = {
    firstName: {
        required: {
            value: true,
            message: 'Vorname muss angegeben sein.'
        },
        pattern: {
            value: nameRegex,
            message: 'Unerlaubte Zeichen im Vornamen.'
        }
    },
    lastName: {
        required: {
            value: true,
            message: 'Nachname muss angegeben sein.'
        },
        pattern: {
            value: nameRegex,
            message: 'Unerlaubte Zeichen im Nachnamen.'
        }
    },
    birthDate: {
        required: {
            value: true,
            message: 'Geburtsdatum muss angegeben sein.'
        }
    },
    birthName: {
        pattern: {
            value: nameRegex,
            message: 'Unerlaubte Zeichen im Geburtsnamen.'
        }
    },
    birthCity: {
        required: {
            value: true,
            message: 'Geburtsort muss angegeben sein.'
        },
        pattern: {
            value: cityRegex,
            message: 'Unerlaubte Zeichen im Geburtsort.'
        }
    },
    birthCountry: {
        required: {
            value: true,
            message: 'Geburtsland muss angegeben sein.'
        },
        pattern: {
            value: cityRegex,
            message: 'Unerlaubte Zeichen im Geburtsland.'
        }
    },
    email: {
        pattern: {
            value: emailRegex,
            message: 'Unerlaubte Zeichen in E-Mail-Adresse.'
        }
    },
    telephone: {
        pattern: {
            value: telephoneRegex,
            message: 'Unerlaubte Zeichen in Telefonnummer.'
        }
    },
    streetNumber: {
        pattern: {
            value: streetNumberRegex,
            message: 'Unerlaubte Zeichen in Straße und Hausnummer.'
        }
    },
    plz: {
        pattern: {
            value: /^[0-9]{5}$/,
            message: 'Postleitzahl muss 5-stellig sein.'
        }
    },
    ort: {
        pattern: {
            value: cityRegex,
            message: 'Unerlaubte Zeichen im Ort.'
        }
    },
}

// Form component
const MemberForm = ({ defaultValues }) => {
    const [hasBirthName, setHasBirthName] = useState(false);
    const [hasDeathDate, setHasDeathDate] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        mode: "onTouched",
        defaultValues
    });
    useEffect(() => {
        reset(defaultValues); // Updates form values when `defaultValues` changes
    }, [defaultValues, reset]); // Re-run effect when `defaultValues` changes

    const { submitMember, loading } = useSaveMember();

    return (
        <>
            <Fieldset.Content>
                {/* ########## Personendaten ########## */}
                <Separator />
                <Text textStyle="sm" fontWeight="bold">Personendaten</Text>
                <Stack direction={{ base: "column", md: "row" }} w="full">
                    <Field
                        required
                        label="Vorname"
                        floatingLabel
                        invalid={errors.first_name}
                        errorText={errors.first_name?.message}
                    >
                        <Input
                            name="Vorname"
                            {...register(
                                "first_name",
                                { ...validations.firstName }
                            )}
                        />
                    </Field>
                    <Field
                        required
                        label="Nachname"
                        floatingLabel
                        invalid={errors.last_name}
                        errorText={errors.last_name?.message}
                    >
                        <Input
                            name="Nachname"
                            {...register(
                                "last_name",
                                { ...validations.lastName }
                            )}
                        />
                    </Field>
                </Stack>
                <Field
                    required
                    label="Geburtsdatum"
                    floatingLabel
                    invalid={errors.birth_date}
                    errorText={errors.birth_date?.message}
                >
                    <Input
                        name="Geburtsdatum"
                        type="date"
                        {...register(
                            "birth_date",
                            { ...validations.birthDate }
                        )}
                    />
                </Field>
                <Stack direction={{ base: "column", md: "row" }} w="full">
                    <Field
                        required
                        label="Geburtsort"
                        floatingLabel
                        invalid={errors.birth_city}
                        errorText={errors.birth_city?.message}
                    >
                        <Input
                            name="Geburtsort"
                            {...register(
                                "birth_city",
                                { ...validations.birthCity }
                            )}
                        />
                    </Field>
                    <Field
                        required
                        label="Geburtsland"
                        floatingLabel
                        invalid={errors.birth_country}
                        errorText={errors.birth_country?.message}
                    >
                        <Input
                            name="Geburtsland"
                            {...register(
                                "birth_country",
                                { ...validations.birthCountry }
                            )}
                        />
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
                            <Field
                                label="Geburtsname"
                                floatingLabel
                                invalid={errors.birth_name}
                                errorText={errors.birth_name?.message}
                            >
                                <Input
                                    name="Geburtsname"
                                    {...register(
                                        "birth_name",
                                        { ...validations.birthName }
                                    )}
                                />
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
                            <Field
                                label="Sterbedatum"
                                floatingLabel
                            >
                                <Input
                                    name="Sterbedatum"
                                    type="date"
                                    {...register("death_date")}
                                />
                            </Field>)}
                    </Box>
                </Stack>
                {/* ########## Kontaktdaten ########## */}
                {!hasDeathDate && (
                    <>
                        <Separator />
                        <Text textStyle="sm" fontWeight="bold">Kontaktdaten</Text>
                        <Stack direction={{ base: "column", md: "row" }}>
                            <Field
                                label="Email"
                                floatingLabel
                                invalid={errors.email}
                                errorText={errors.email?.message}
                            >
                                <Input
                                    name="email"
                                    type="email"
                                    {...register(
                                        "email",
                                        { ...validations.email }
                                    )}
                                />
                            </Field>
                            <Field
                                label="Telefon"
                                floatingLabel
                                invalid={errors.telephone}
                                errorText={errors.telephone?.message}
                            >
                                <Input
                                    name="Telefon"
                                    {...register(
                                        "telephone",
                                        { ...validations.telephone }
                                    )}
                                />
                            </Field>
                        </Stack>
                        <Field
                            label="Straße und Hausnummer"
                            floatingLabel
                            invalid={errors.street_number}
                            errorText={errors.street_number?.message}
                        >
                            <Input
                                name="Straße und Hausnummer"
                                {...register(
                                    "street_number",
                                    { ...validations.streetNumber }
                                )}
                            />
                        </Field>
                        <Stack direction={{ base: "column", md: "row" }}>
                            <Field
                                label="Postleitzahl"
                                floatingLabel
                                invalid={errors.plz}
                                errorText={errors.plz?.message}
                            >
                                <Input
                                    name="Postleitzahl"
                                    {...register(
                                        "plz",
                                        { ...validations.plz }
                                    )}
                                />
                            </Field>
                            <Field
                                label="Ort"
                                floatingLabel
                                invalid={errors.city}
                                errorText={errors.city?.message}
                            >
                                <Input
                                    name="Ort"
                                    {...register(
                                        "city",
                                        { ...validations.ort }
                                    )}
                                />
                            </Field>
                        </Stack>
                    </>
                )}
            </Fieldset.Content>

            <Button
                type="submit"
                alignSelf="flex-end"
                colorPalette="brand"
                onClick={handleSubmit((data) => submitMember({ memberData: data, reset }))}
                loading={loading}
                loadingText="Speichern...">
                Speichern
            </Button>
        </>
    )
};

export default MemberForm;