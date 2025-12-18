<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // GET /api/tasks?q=
    public function index(Request $request)
    {
        $q = $request->query('q');

        $tasks = Task::query()
            ->when($q, fn ($query) =>
                $query->where('title', 'like', "%{$q}%")
                      ->orWhere('description', 'like', "%{$q}%")
            )
            ->orderByDesc('id')
            ->get();

        return response()->json($tasks);
    }

    // POST /api/tasks
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'is_completed' => ['nullable', 'boolean'],
        ]);

        $task = Task::create([
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
            'is_completed' => $data['is_completed'] ?? false,
        ]);

        return response()->json($task, 201);
    }

    // PUT /api/tasks/{task}
    public function update(Request $request, Task $task)
    {
        $data = $request->validate([
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'is_completed' => ['nullable', 'boolean'],
        ]);

        $task->update($data);

        return response()->json($task);
    }

    // DELETE /api/tasks/{task}
    public function destroy(Task $task)
    {
        $task->delete();

        return response()->json(['deleted' => true]);
    }
}
