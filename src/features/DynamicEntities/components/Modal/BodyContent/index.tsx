import React, { ChangeEvent } from "react";

import {
    Button,
    Flex,
    FlexboxProps,
    forwardRef,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Select,
    Switch,
    Textarea,
} from "@chakra-ui/react";

import { Control, Controller, FieldArrayWithId } from "react-hook-form";
import { BsFillKeyFill, BsFillTrashFill } from "react-icons/bs";
import { IoBanSharp } from "react-icons/io5";

import { DynamicEntitiesData } from "../../..";
import ConditionIcon from "../ConditionIcon";
import ControllField from "../ControllField";

type BodyContentProps = {
    control: Control<DynamicEntitiesData, any>;
    append: any;
    remove: any;
    fields: FieldArrayWithId<DynamicEntitiesData, "properties", "id">[];
    errors: any;
    [x: string]: any;
};

const BodyContent: React.FC<BodyContentProps> = forwardRef<FlexboxProps, any>(
    ({ control, append, remove, fields, errors }, ref) => {
        const initialPropertyRecord = {
            propertyName: "",
            systemTypeName: "",
            dynamicEntityDataBaseProperty: {
                isKey: false,
                isNotNull: false,
                comment: "",
                dataBaseTypeName: "",
                length: 20,
            },
        };

        const switchWrapperProps = React.useMemo(
            () => ({
                justifyContent: "center",
                height: "full",
                alignItems: "center",
                direction: "column",
                gap: 3,
            }),
            []
        );

        return (
            <Flex gap={3} direction="column">
                <ControllField
                    labelKey="entityName"
                    errors={errors.entityName}
                    title="Entity Name"
                    controller={
                        <Controller
                            name="entityName"
                            control={control}
                            render={({ field }) => (
                                <Input {...field} id="entityName" ref={ref} />
                            )}
                            rules={{
                                required: { message: "error", value: true },
                            }}
                        />
                    }
                />
                {fields.map((item: any, index: number) => (
                    <React.Fragment key={item.id}>
                        <ControllField
                            title="Property Name"
                            errors={errors?.properties?.[index]?.propertyName}
                            labelKey={`property-${index}`}
                            controller={
                                <Controller
                                    name={`properties.${index}.propertyName`}
                                    control={control}
                                    render={({ field }) => (
                                        <InputGroup>
                                            <Input
                                                {...field}
                                                id={`property-${index}`}
                                            />
                                            <InputRightElement
                                                width={"fit-content"}
                                                paddingRight={2}
                                                children={
                                                    <Flex gap={3}>
                                                        <ConditionIcon
                                                            control={control}
                                                            index={index}
                                                            field="isKey"
                                                            color="yellow.500"
                                                            label="This property is key"
                                                            icon={BsFillKeyFill}
                                                        />
                                                        <ConditionIcon
                                                            control={control}
                                                            field="isNotNull"
                                                            color="red.200"
                                                            index={index}
                                                            label="This property maybe NULL"
                                                            icon={IoBanSharp}
                                                        />
                                                    </Flex>
                                                }
                                            />
                                        </InputGroup>
                                    )}
                                />
                            }
                            actions={
                                <IconButton
                                    icon={<BsFillTrashFill />}
                                    aria-label="delete property"
                                    onClick={() => remove(index)}
                                />
                            }
                        />
                        <Flex
                            direction={"row"}
                            gap={6}
                            justifyItems="center"
                            width={"full"}
                            justifyContent={"space-between"}
                        >
                            <ControllField
                                labelKey="length"
                                title="Length"
                                controller={
                                    <Controller
                                        control={control}
                                        name={`properties.${index}.dynamicEntityDataBaseProperty.length`}
                                        render={({ field }) => (
                                            <Input {...field} type="number" />
                                        )}
                                    />
                                }
                            />
                            <ControllField
                                as={Flex}
                                {...switchWrapperProps}
                                labelKey="isKey"
                                title="Is key"
                                controller={
                                    <Controller
                                        control={control}
                                        name={`properties.${index}.dynamicEntityDataBaseProperty.isKey`}
                                        render={({ field }) => (
                                            <Switch
                                                onChange={(
                                                    e: ChangeEvent<HTMLInputElement>
                                                ) =>
                                                    field.onChange(
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                        )}
                                    />
                                }
                            />
                            <ControllField
                                as={Flex}
                                {...switchWrapperProps}
                                labelKey="isNotNull"
                                title="Is not NULL"
                                controller={
                                    <Controller
                                        control={control}
                                        name={`properties.${index}.dynamicEntityDataBaseProperty.isNotNull`}
                                        render={({ field }) => (
                                            <Switch
                                                onChange={(
                                                    e: ChangeEvent<HTMLInputElement>
                                                ) =>
                                                    field.onChange(
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                        )}
                                    />
                                }
                            />
                        </Flex>
                        <Flex gap={3} direction={"row"}>
                            <ControllField
                                labelKey="systemType"
                                title="System Type"
                                controller={
                                    <Controller
                                        name={`properties.${index}.systemTypeName`}
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                id="systemType"
                                                placeholder="Select type"
                                            >
                                                <option>System.Int32</option>
                                                <option>System.String</option>
                                            </Select>
                                        )}
                                    />
                                }
                            />
                            <ControllField
                                labelKey="dataBaseTypeName"
                                title="DB Type"
                                controller={
                                    <Controller
                                        name={`properties.${index}.dynamicEntityDataBaseProperty.dataBaseTypeName`}
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                id="dataBaseTypeName"
                                                placeholder="Select type"
                                            >
                                                <option>Int32</option>
                                                <option>String</option>
                                            </Select>
                                        )}
                                    />
                                }
                            />
                        </Flex>
                        <ControllField
                            title="Comment"
                            labelKey="comment"
                            controller={
                                <Controller
                                    name={`properties.${index}.dynamicEntityDataBaseProperty.comment`}
                                    control={control}
                                    render={({ field }) => (
                                        <Textarea
                                            {...field}
                                            id="comment"
                                            placeholder="Here is a sample placeholder"
                                            size="sm"
                                        />
                                    )}
                                />
                            }
                        />
                    </React.Fragment>
                ))}
                <Flex gap={3} direction={"row"}>
                    <Button
                        type="button"
                        onClick={() => append(initialPropertyRecord)}
                    >
                        append
                    </Button>
                </Flex>
            </Flex>
        );
    }
);
export default BodyContent;
