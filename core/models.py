from django.db import models
from django.core.validators import MinLengthValidator, MaxLengthValidator

class User(models.Model):
    """
    A basic Django model representing a user.
    Note: Password hashing and verification are handled manually in serializers/views
          as this model does not use Django's built-in authentication features.
    """
    username = models.CharField(
        max_length=15,
        unique=True,
        validators=[
            MinLengthValidator(3, message="Username must be at least 3 characters long."),
            MaxLengthValidator(15, message="Username cannot exceed 15 characters."),
        ],
    )
    password = models.CharField(
        max_length=128, # Still recommended to store hashed passwords, but hashing will be manual
    )
    email = models.EmailField(
        unique=True,
    )

    class Meta:
        """
        Meta options for the User model.
        """
        verbose_name = "Basic User"
        verbose_name_plural = "Basic Users"
        ordering = ['username']

    def save(self, *args, **kwargs):
        """
        Ensures the email is stored in lowercase before saving.
        """
        if self.email:
            self.email = self.email.lower()
        super().save(*args, **kwargs)

    def __str__(self):
        """
        String representation of the User object.
        """
        return self.username

