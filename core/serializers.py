from rest_framework import serializers
from .models import User

# Your existing UserSerializer for general CRUD
class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model (for general CRUD operations).
    WARNING: This serializer will read/write passwords as plaintext directly to the database.
    """
    class Meta:
        model = User
        fields = '__all__'


class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration. Handles password confirmation.
    WARNING: This serializer saves passwords as plaintext.
    """
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        if not data['password']:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        return data

    def create(self, validated_data):
        # Directly create the user with the plaintext password
        user = User.objects.create(**validated_data)
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            raise serializers.ValidationError("Both username and password are required.")


        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid credentials (username/email not found).")

        # WARNING: Direct plaintext password comparison (HIGHLY INSECURE)
        if user.password == password:
            data['user'] = user # Store the authenticated user object in validated_data
        else:
            raise serializers.ValidationError("Invalid credentials (incorrect password).")

        return data

