from rest_framework import viewsets, permissions, status
from .models import Task
from .serializers import TaskSerializer
from rest_framework.decorators import action
from rest_framework.response import Response

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=True, methods=["post"])
    def done(self, request, pk=None):
        task = self.get_object()
        task.done = not task.done
        task.save()

        return Response({'status': 'task marked as done' if task.done else 'task marked as undone'}, status=status.HTTP_200_OK)