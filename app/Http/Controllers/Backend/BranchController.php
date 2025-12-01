<?php

namespace App\Http\Controllers\Backend;

use App\DataTables\BranchDataTable;
use App\Http\Controllers\Controller;
use App\Models\Branch;
use Brian2694\Toastr\Facades\Toastr;
use Illuminate\Http\Request;

class BranchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(BranchDataTable $dataTable)
    {
        return $dataTable->render('backend.branch.index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('backend.branch.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $validation = $request->validate([
            'name' => 'required|max:256',
            'location_url' => 'required|url',
            'description' => 'required',
            'status' => 'required|boolean'
        ]);
        Branch::create($validation);
        Toastr::success('Branch Created Successfully!');
        return redirect()->route('admin.branch.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $branch = Branch::findOrFail($id);
        return view('backend.branch.edit', compact('branch'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $branch = Branch::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required|max:256|unique:branches,name,' . $branch->id,
            'location_url' => 'required|url',
            'description' => 'required',
            'status' => 'required|boolean'
        ]);
        $branch->update($validated);
        Toastr::success('Branch Updated Successfully!');
        return redirect()->route('admin.branch.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $branch = Branch::findOrFail($id);
        $branch->delete();
        return response(['status' => 'success', 'message' => 'Delete Successfully!']);
    }

    public function changeStatus(Request $request)
    {
        $branch = Branch::findOrFail($request->id);
        $branch->status = $request->status == 'true' ? 1 : 0;
        $branch->save();
        return response(['status' => 'success', 'message' => 'Branch Status Updated Successfully!']);
    }
}
