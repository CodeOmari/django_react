from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note


class UserSerializer(serializers.ModelSerializer):
    # password1 = serializers.CharField(write_only=True)
    # password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password']
        extra_kwargs = {'password': {'write_only': True}}
        # extra_kwargs can only be used when the password field is defined in the model
        # e.g fields = ['username', 'password']
        # extra_kwargs = {
        #     'password1': {'write_only': True},
        #     'password2': {'write_only': True},
        # }


    # def validate(self, data):
    #     if data['password1'] != data['password2']:
    #         raise serializers.ValidationError("Passwords do not match.")
    #     return data
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data) 
        # create_user only accepts username and password
        # user = User.objects.create_user(
        #     username=validated_data['username'],
        #     password=validated_data['password1']
        # )
        return user
    

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'
        # read_only_fields = ['author', 'created_at', 'updated_at']
        # extra_kwargs works only when the field is defined in the model
        extra_kwargs = {
            "author": {"read_only": True},
            "created_at": {"read_only": True},
            "updated_at": {"read_only": True},
        }