import { Text, TextInput, View } from "react-native";

interface InputFieldProps {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (value: string) => void;
  secureTextEntry?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder = "",
  value,
  onChangeText,
  secureTextEntry = false,
}) => (
  <View className="w-full">
    {/* Label */}
    <Text className="text-lg font-semibold text-gray-700 mb-2">{label}</Text>

    {/* Input */}
    <TextInput
      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base"
      placeholder={placeholder}
      value={value}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
    />
  </View>
);

export default InputField;
