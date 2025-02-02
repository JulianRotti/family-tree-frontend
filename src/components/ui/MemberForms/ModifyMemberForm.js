import { Box, Button, Fieldset, Input, Stack, HStack, Separator, Text, createListCollection } from "@chakra-ui/react"
import { Field } from "components/ui/field.jsx"
import { Switch } from "components/ui/switch.jsx"
import {
    FileUploadList,
    FileUploadRoot,
    FileUploadTrigger,
} from "components/ui/file-upload.jsx"
import {
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
  } from "components/ui/select.jsx"
import { HiUpload } from "react-icons/hi"
import { useState } from "react"

const SelectMembers = () => {
    return (
      <SelectRoot collection={frameworks} size="sm" width="320px">
        <SelectLabel>Mitglied auswählen</SelectLabel>
        <SelectTrigger>
          <SelectValueText placeholder="Name"/>
        </SelectTrigger>
        <SelectContent>
          {frameworks.items.map((movie) => (
            <SelectItem item={movie} key={movie.value}>
              {movie.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    )
  }

  const frameworks = createListCollection({
    items: [
      { label: "Hans Zimmer", value: "id1" },
      { label: "Rudolph Hammer", value: "id2" },
      { label: "Anita Bogenfrau", value: "id3" }
    ],
  })


const ModifyMemberForm = ({ maxW }) => {
    const [hasBirthName, setHasBirthName] = useState(false)
    const [hasDeathDate, setHasDeathDate] = useState(false)
    return (
        <Box>
            <Fieldset.Root size="lg" maxW={maxW}>
                <Stack>
                    <Fieldset.Legend>Bestehendes Familienmitglied ändern</Fieldset.Legend>
                    <Fieldset.HelperText>
                        Familienmitglied suchen, Daten des neuen Familienmitglieds eintragen und auf Speichern klicken.
                    </Fieldset.HelperText>
                </Stack>

                <Fieldset.Content>
                    {/* ########## Suchen ########## */}
                    <SelectMembers/>
                    {/* ########## Personendaten ########## */}
                    <Separator />
                    <Text textStyle="sm" fontWeight="bold">Personendaten</Text>
                    <Stack direction={{ base: "column", md: "row" }} w="full">
                        <Field required label="Vorname" floatingLabel>
                            <Input name="Vorname" />
                        </Field>
                        <Field required label="Nachname" floatingLabel>
                            <Input name="Nachname" />
                        </Field>
                    </Stack>
                    <HStack>
                        <Field required label="Geburtsdatum" floatingLabel>
                            <Input name="Geburtsdatum" type="date" />
                        </Field>
                    </HStack>
                    <Field required label="Geburtsort" floatingLabel>
                        <Input name="Geburtsort" />
                    </Field>
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
                                    <Input name="Geburtsname" />
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
                                    <Input name="Sterbedatum" type="date" />
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
                                <Input name="email" type="email" />
                            </Field>
                            <Field label="Telefon" floatingLabel>
                                <Input name="Telefon" />
                            </Field>
                        </Stack>
                        <Field label="Straße und Hausnummer" floatingLabel>
                            <Input name="Straße und Hausnummer" placeholder="Straße Hausnummer" />
                        </Field>
                        <Stack direction={{ base: "column", md: "row" }}>
                            <Field label="Postleitzahl" floatingLabel>
                                <Input name="Postleitzahl" placeholder="Postleitzahl" />
                            </Field>
                            <Field label="Ort" floatingLabel>
                                <Input name="Ort" placeholder="Ort" />
                            </Field>
                        </Stack>
                    </>
                    )}
                </Fieldset.Content>

                <Button type="submit" alignSelf="flex-end" colorPalette="brand">
                    Speichern
                </Button>
            </Fieldset.Root>
        </Box>
    )
};

export default ModifyMemberForm;