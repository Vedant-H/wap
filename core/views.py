from rest_framework import viewsets, status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import User
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer # Import new serializers

# Your existing UserViewSet for general CRUD
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# API View for User Registration
class RegisterAPIView(APIView):
    """
    API endpoint for user registration.
    WARNING: This view saves passwords as plaintext.
    """
    permission_classes = [permissions.AllowAny] # Anyone can register

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "message": "User registered successfully!",
                "username": user.username,
                "email": user.email,
                "user_id": user.id
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# API View for User Login
class LoginAPIView(APIView):
    """
    API endpoint for user login.
    WARNING: This view compares passwords as plaintext.
    """
    permission_classes = [permissions.AllowAny] # Anyone can attempt to login

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            return Response({
                "message": "Login successful!",
                "username": user.username,
                "email": user.email,
                "user_id": user.id
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

